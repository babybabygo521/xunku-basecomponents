import { selDeptAndUserTree, listUserName } from '@/api/system/user'

export function loadContactAPI() {
  return selDeptAndUserTree()
}

export function loadUserListAPI() {
  return listUserName()
}
