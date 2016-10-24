
export const OPEN_APP_BAR_DROPDOWN = 'OPEN_APP_BAR_DROPDOWN'
export const openAppBarDropdown = (target) => ({
  type: OPEN_APP_BAR_DROPDOWN,
  anchor: target,
})

export const CLOSE_APP_BAR_DROPDOWN = 'CLOSE_APP_BAR_DROPDOWN'
export const closeAppBarDropdown = () => ({
  type: CLOSE_APP_BAR_DROPDOWN,
})
