import Navigation from '@showcase/navigation'
import Button from '@showcase/button'
import Cell from '@showcase/cell'

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
}]

export default routes
