import LayoutLugar from '../layouts/LayoutLugar';
import LayoutBasic from '../layouts/Layoutbasic';
import LayoutPerfil from '../layouts/LayoutPerfil';


//Paginas del lugar
import LugarHome from '../pages/Lugar';
import LugarSignIn from '../pages/SignIn';
import ProductosPage from '../pages/Productos';
import SliderPage from '../pages/Slide';
import PromoPage from '../pages/Promo';
import SubProductos from '../pages/Productos/SubProductos';
import Mapa from '../pages/Mapa';

//Menu de la pagina
import Menu from '../pages/Menu/MenuLugar';
import Perfil from '../pages/Menu/Perfil';

//Vistas principales
import HomePagina from '../pages/HomePagina';
import Contact from '../pages/Contact';

//Other
import Error404 from '../pages/Error404';


const routes = [{
        path: "/Lugar",
        component: LayoutLugar,
        exact: false,
        routes: [{
                path: "/Lugar",
                component: LugarHome,
                exact: true
            },
            {
                path: "/Lugar/login",
                component: LugarSignIn,
                exact: true
            },
            {
                path: "/Lugar/Productos",
                component: ProductosPage,
                exact: true
            },
            {
                path: "/Lugar/Slide",
                component: SliderPage,
                exact: true
            },

            {
                path: "/Lugar/Promociones",
                component: PromoPage,
                exact: true
            },
            {
                path: "/Lugar/Ubicacion",
                component: Mapa,
                exact: true
            },
            {
                path: "/Lugar/:id",
                component: SubProductos,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },
    {
        path: "/Menu/:id",
        component: LayoutPerfil,
        exact: false,
        routes: [{
                path: "/Menu/:id",
                component: Menu,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },
    {
        path: "/Perfil/:id",
        component: LayoutPerfil,
        exact: false,
        routes: [{
                path: "/Perfil/:id",
                component: Perfil,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },
    {
        path: "/",
        component: LayoutBasic,
        exact: false,
        routes: [{
                path: "/",
                component: HomePagina,
                exact: true
            },
            {
                path: "/Contacto",
                component: Contact,
                exact: true
            },
            {
                component: Error404
            }
        ]
    }


];

export default routes;