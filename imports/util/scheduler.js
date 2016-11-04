
// Xtern scheduling algorithm.
// Takes in an object with the following parameters:
//  students:
//   [ { email, roles } ]
//    roles:
//     [ name ]
//  companies:
//   [ { name, candidates, roles } ]
//    candidates:
//     [ email ]
//    roles:
//     [ name ]
//  maxRounds: 
//   int (defaults 8)
//  minStudentInterviews
//   int (defaults 2)
//  maxStudentInterviews
//   int (defaults 4)
//  toFile
//   string ==> file to output csv data to
//   if not provided, this will not output anything
//
// ALGORITHM
// For each round, we iterate over each company randomly.
//  This is done randomly to ensure that if the program is given an alphabetical list, 
//  the rounds do not favor companies at the top of the list. But this does mean that each
//  invocation of the program will likely generate a slightly different schedule.
// For each company, we assign them the most ideal candidate for them to interview.
// This "idealness" is the student->company pair with the highest score from 0 to 1,
// which is calculated by the following parameters:
// - if a student has already hit their max interviews ==> 0
// - if a student has already interviewed with this company ==> 0
// - if a student is already busy with an interview this round ==> 0
// - if a company wants to interview a specific candidate ==> 1
// - if a candidate has a role a company is looking for ==> 0.9
// and in every other case...
// (hopefully few matches are made on this case, but it is possible)
//    ==> max(min(1 - (interviewsStudentHasHad / minStudentInterviews), 0.80), 0.10)
// explanation:
//  - when a candidate has had 0 interviews but we need them to have 2, this resolves to 0.80, which 
//    means the more specific bullet points above get priority but any companies without selections
//    will get this candidate.
//  - this number decreases as the candidate receives interviews, bottoming out at 0.1 between 
//    minStudentInterviews and maxStudentInterviews. 
//  - this has the effect of distributing interviews evenly across candidates. instead of 1 candidate
//    getting 2 interviews, 2 candidates will each get 1 interview.
//  - Once max is hit, we shortcircuit to 0 as per the first rule
// The candidate is marked busy for the round, and the match is returned.

import { stringify } from 'csv'
import fs from 'fs'
import _ from 'lodash'

const DEFAULT_N_ROUNDS = 8
const DEFAULT_MIN_STUDENT_IVIEWS = 2
const DEFAULT_MAX_STUDENT_IVIEWS = 4

export const Schedule = ({
  companies,
  minStudentInterviews,
  maxStudentInterviews,
  nRounds,
  students,
  toFile,
}) => {
  if (!nRounds) nRounds = DEFAULT_N_ROUNDS
  if (!minStudentInterviews) minStudentInterviews = DEFAULT_MIN_STUDENT_IVIEWS
  if (!maxStudentInterviews) maxStudentInterviews = DEFAULT_MAX_STUDENT_IVIEWS

  // Clean up the input as much as possible.
  // lowercase all company names, roles, and candidate emails
  companies = _.map(companies, (company) => {
    return {
      name: company.name.toLowerCase(),
      roles: _.map(company.roles || [], (role) => {
        return role.toLowerCase()
      }),
      candidates: _.map(company.candidates || [], (candidate) => {
        return candidate.toLowerCase()
      }),
    }
  })

  // lowercase all student email addresses and roles 
  students = _.map(students, (student) => {
    return {
      email: student.email.toLowerCase(),
      roles: _.map(student.roles || [], (role) => {
        return role.toLowerCase()
      }),
    }
  })

  // Sanity checks to make sure that the two data sources have accurate references to each other
  // Check to make sure companies reference candidates that exist
  _.forEach(companies, (company) => {
    _.forEach(company.candidates, (candidate) => {
      const student = _.find(students, (s) => s.email === candidate)
      if (!student) console.error(`warning: ${company.name} ref student ${candidate} ✗`)
    })
  })

  // Check to make sure companies reference roles that at least one student has
  _.forEach(companies, (company) => {
    _.forEach(company.roles, (role) => {
      if (!_.some(students, (student) => {
        return _.includes(student.roles, role)
      })) {
        console.error(`warning: ${company.name} ref role ${role} ✗`)
      }
    })
  })

  // Reverse: check to make sure students reference roles that at least one company wants
  _.forEach(students, (student) => {
    _.forEach(student.roles, (role) => {
      if (!_.some(companies, (company) => {
        return _.includes(company.roles, role)
      })) {
        console.error(`warning: ${student.email} ref role ${role} ✗`)
      }
    })
  })

  // Previous interviews per student. This is stored globally considering we 
  // make a lot of per-company and per-round copies of objects in the 
  // loops below.
  const interviewHistory = _.reduce(students, (accum, student) => {
    accum[student.email] = []
    return accum
  }, {})

  // For each round up to the total number of rounds
  const results = _.flatten(_.map(_.range(nRounds), (roundNumber) => {

    // Store a list of all students who are busy this round. Fuck it.
    const busyStudents = []

    // We shuffle the list of companies so as to not bias the companies who are listed 
    // first getting first pick of candidates each round.
    const shuffledCompanies = _.shuffle(companies)

    // For each company, find the candidate with the highest possible match score
    const matches = _.map(shuffledCompanies, (company) => {

      // This involves searching the list of students and calculating a 
      // score based upon the algorithm outlined in the documentation above.
      const studentsWithScore = _.map(students, (student) => {
        student = { ...student }
        if (interviewHistory[student.email].length >= maxStudentInterviews) {
          student._score = 0
        } else if (_.includes(interviewHistory[student.email], company.name)) {
          student._score = 0
        } else if (_.includes(busyStudents, student.email)) {
          student._score = 0
        } else if (_.includes(company.candidates, student.email)) {
          student._score = 1
        } else if (_.some(company.roles, (role) => _.includes(student.roles, role))) {
          student._score = 0.9
        } else {
          student._score = Math.max(Math.min(1 - (interviewHistory[student.email].length / minStudentInterviews), 0.80), 0.10)  
        }
        return student
      })
      const highestScore = _.maxBy(studentsWithScore, '_score')

      // If the score is zero, this company has no great candidates, and thus 
      // will not have a candidate this round. This should rarely happen.
      if (highestScore._score < 0.01) return {
        round: roundNumber,
        company,
        student: null,
      }

      // Record that the student had an interview with this company
      interviewHistory[highestScore.email].push(company.name)
      busyStudents.push(highestScore.email)

      // Return the match
      return {
        round: roundNumber,
        company,
        student: highestScore,
      }

    })

    // Just return the list of matches. 
    // This is put into an array of all matches after this step, and we sort on the round 
    // key afterward.
    return matches

  }))

  printMatches(results, interviewHistory, minStudentInterviews)

  if (toFile) {
    exportToCsv(results, toFile)
  }

}

const printMatches = (matches, interviewHistory, minStudentInterviews) => {
  matches = _.sortBy(matches, 'round')
  console.log('=== schedule')
  _.forEach(matches, ({ round, company, student }) => {
    const r = round
    const cn = company.name
    const sn = student ? student.email : 'n/a'
    const sc = student ? student._score : '-'
    const cnt = student ? interviewHistory[sn].length : '-'
    console.log(`${r} ${cn} => ${sn} (s:${sc}) (n:${cnt})`)
  })
  const countBelow = _.reduce(interviewHistory, (accum, candidateHistory, emai) => {
    if (candidateHistory.length < minStudentInterviews) {
      return accum + 1
    }
    return accum
  }, 0)
  if (countBelow === 0) {
    console.log(`=== no candidates below minimum threshold (${minStudentInterviews}) :)`)
  } else {
    console.log('=== candidates below min threshold')
    _.forEach(interviewHistory, (candidateHistory, email) => console.log(`${email}`))
  }
}

const exportToCsv = (matches, toFile) => {
  matches = _(matches)
    .sortBy('round')
    .reject((match) => !match.student)
    .map(({ round, company, student }) => {
      return [ round, company.name, student.email, student._score ]
    })
    .value()
  matches = [
    [ 'round', 'company_name', 'student_email', 'score' ],
    ...matches,
  ]
  stringify(matches, (err, csvString) => {
    if (err) return console.error(err)
    fs.writeFile(toFile, csvString, (err) => {
      if (err) return console.error(err)
    })
  })
}

export const TestSchedule = () => {
  Schedule({
    toFile: '/Users/mike/src/xtern-manager/export.csv',
    companies: [
      { 
        name: 'High Alpha', 
        candidates: [ 'Mike', 'Ben' ],
        roles: [ 'frontend', 'backend', 'design', 'it' ],
      },
      { 
        name: 'Angies List', 
        candidates: [ 'Kyle', 'Tylor', 'Kate' ],
        roles: [ 'frontend', 'pm' ],
      },
      { 
        name: 'TechPoint', 
        candidates: [ 'Fran', 'Nichole', 'Alex' ],
        roles: [ 'hr' ],
      },
      { 
        name: 'BidPal', 
        candidates: [ 'Ashley', 'Aaron' ],
        roles: [ 'frontend' ],
      },
      { 
        name: 'InIn', 
        candidates: [ 'Mike', 'Ben', 'Nathan' ],
        roles: [ 'frontend', 'backend', 'hr' ],
      },
      {
        name: 'NextGear',
        candidates: [ 'Harrison', 'Schutter' ],
        roles: [ 'backend' ],
      }
    ],
    students: [
      { 
        email: 'Mike',
        roles: [ 'frontend', 'backend' ],
      },
      { 
        email: 'Kyle',
        roles: [ 'backend' ],
      },
      { 
        email: 'Tylor',
        roles: [ 'frontend' ],
      },
      { 
        email: 'Nichole',
        roles: [ 'hr' ],
      },
      {
        email: 'Ashley',
        roles: [ 'frontend' ],
      },
      { 
        email: 'Ben',
        roles: [ 'frontend' ],
      },
      { 
        email: 'Alex',
        roles: [ 'hr', 'frontend' ],
      },
      { 
        email: 'Fran',
        roles: [ 'hr' ],
      },
      { 
        email: 'Chelsie',
        roles: [ 'design' ], 
      },
      { 
        email: 'Ian',
        roles: [ 'backend' ],
      },
      { 
        email: 'Ryan',
        roles: [ 'hr', 'partnerships' ],
      },
      {
        email: 'Harrison',
        roles: [ 'backend' ],
      },
      {
        email: 'Schutter',
        roles: [ 'frontend' ],
      },
      {
        email: 'Kate',
        roles: [ 'pm' ],
      },
    ]
  })
}
