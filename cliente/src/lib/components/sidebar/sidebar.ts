import prestamoIcon from "$lib/images/payments_24dp_FILL0_wght400_GRAD0_opsz24.svg"
import montosIcon from "$lib/images/account_balance_24dp_FILL0_wght400_GRAD0_opsz24.svg"
import managePrestamosIcon from "$lib/images/savings_24dp_FILL0_wght400_GRAD0_opsz24.svg"

import retirosIcon from "$lib/images/account_balance_wallet_24dp_FILL0_wght400_GRAD0_opsz24.svg"
import manageRetirosIcon from "$lib/images/attach_money_24dp_FILL0_wght400_GRAD0_opsz24.svg"
import reingresosIcon from "$lib/images/groups_24dp_FILL0_wght400_GRAD0_opsz24.svg"

import usersIcon from "$lib/images/contacts_24dp_FILL0_wght400_GRAD0_opsz24.svg"
import dbIcon from "$lib/images/database_24dp_FILL0_wght400_GRAD0_opsz24.svg"

export type UserRoles = "Administrador" | "Auditor" | "Editor" | string

type routes = {
    routeName: string,
    path: string,
    routeLogo: string
    access: UserRoles[]
}

interface sidebarSections {
    sectionName: string,
    routes: routes[],
    access: UserRoles[]
}

export let sidebarSections: sidebarSections[] = [
    {
        sectionName: "Prestamos",
        access: ["Administrador", "Auditor", "Editor"],
        routes: [
            {
                routeName: "Nuevo Prestamo",
                path: "/prestamo",
                routeLogo: prestamoIcon,
                access: ["Administrador", "Auditor", "Editor"],
            },
            {
                routeName: "Modificar Montos",
                path: "/manage/variables",
                routeLogo: montosIcon,
                access: ["Administrador", "Auditor", "Editor"],
            },
            {
                routeName: "Administrar Prestamos",
                path: "/reports/prestamos",
                routeLogo: managePrestamosIcon,
                access: ["Administrador", "Auditor", "Editor"],
            }
        ]
    },
    {
        sectionName: "Retiros",
        access: ["Administrador", "Auditor", "Editor"],
        routes: [
            {
                routeName: "Nuevo Retiro",
                path: "/retiro",
                routeLogo: retirosIcon,
                access: ["Administrador", "Auditor", "Editor"],
            },
            {
                routeName: "Administrar Retiros",
                path: "/reports/retiro",
                routeLogo: manageRetirosIcon,
                access: ["Administrador", "Auditor", "Editor"],
            },
            {
                routeName: "Reingresos",
                path: "/manage/reingresos",
                routeLogo: reingresosIcon,
                access: ["Administrador", "Auditor"],
            },
        ]
    },
    {
        sectionName: "Usuarios",
        access: ["Administrador"],
        routes: [
            {
                routeName: "Administrar Usuarios",
                path: "/manage/usuarios",
                routeLogo: usersIcon,
                access: ["Administrador"],
            }
        ]
    },
    {
        sectionName: "Respaldo y Seguridad",
        access: ["Administrador"],
        routes: [
            {
                routeName: "Administrar Copias de Seguridad",
                path: "/manage/backup",
                routeLogo: dbIcon,
                access: ["Administrador"],
            },
        ]
    }
]

export function clickOutside(node: any) {
    const handleClick = (event: any) => {
        if (node && !node.contains(event.target) && !event.defaultPrevented) {
            node.dispatchEvent(new CustomEvent('click_outside', node))
        }
    }
    document.addEventListener('click', handleClick, true);
    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    }
}
