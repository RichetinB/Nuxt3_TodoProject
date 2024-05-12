export default function (context) {
    let user = context.store.getters['auth/user']
  
    if ( user.id != 1 ) {
      return context.redirect('/errors/403')
    }
  }