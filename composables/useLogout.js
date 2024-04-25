import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'

export default () => {
    const router = useRouter()

    const logout = async () => {
        try {
            // Suppression du cookie
            Cookies.remove('refresh_token')
            console.log("Cookie 'refresh_token' supprimé avec succès.")
            
            // Redirection vers la page d'accueil
            router.push('/')
            console.log("Redirection vers la page d'accueil effectuée.")
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error)
        }
    }
    


    return {
        logout,
    }
}
