export default [
  
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Admin']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Inicio',
    to: '/home',
    icon: 'cil-home'
  },
  
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Contacto',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Listado',
        to: '/contact',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Formulario y Listado',
        to: '/contact/new',
      }
    ]}
  ,
  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

