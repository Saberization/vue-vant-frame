import Navigation from '@showcase/navigation'
import Button from '@showcase/button'
import Cell from '@showcase/cell'
import Header from '@showcase/header'
import Tab from '@showcase/tab'
import Icon from '@showcase/icon'
import Layout from '@showcase/layout'
import Popup from '@showcase/popup'
import Badge from '@showcase/badge'
import Pagination from '@showcase/pagination'
import Tabbar from '@showcase/tabbar'
import Treeselect from '@showcase/treeselect'
import Checkbox from '@showcase/checkbox'
import DatetimePicker from '@showcase/datepicker'
import Field from '@showcase/field'
import NumberKeyboard from '@showcase/numberkeyboard'
import PasswordInput from '@showcase/passwordinput'
import Picker from '@showcase/picker'

const routes = [{
  path: '*',
  redirect: '/navigation'
}, {
  path: '/navigation',
  component: Navigation
}, {
  path: '/button',
  component: Button
}, {
  path: '/cell',
  component: Cell
}, {
  path: '/header',
  component: Header
}, {
  path: '/tab',
  component: Tab
}, {
  path: '/icon',
  component: Icon
}, {
  path: '/layout',
  component: Layout
}, {
  path: '/popup',
  component: Popup
}, {
  path: '/badge',
  component: Badge
}, {
  path: '/pagination',
  component: Pagination
}, {
  path: '/tabbar',
  component: Tabbar
}, {
  path: '/treeselect',
  component: Treeselect
}, {
  path: '/checkbox',
  component: Checkbox
}, {
  path: '/datepicker',
  component: DatetimePicker
}, {
  path: '/field',
  component: Field
}, {
  path: '/numberkeyboard',
  component: NumberKeyboard
}, {
  path: '/passwordinput',
  component: PasswordInput
}, {
  path: '/picker',
  component: Picker
}]

export default routes
