const AUTH_CHANGED_EVENT = 'authChanged'

const USER_KEYS = {
	loggedIn: 'isLoggedIn',
	currentUser: 'currentUser',
	email: 'email',
}

const emitAuthChanged = () => {
	try {
		window.dispatchEvent(new Event(AUTH_CHANGED_EVENT))
	} catch {
		// No-op: keeps helpers safe in environments without window events.
	}
}

const normalizeUser = (userData = {}) => ({
	id: userData?.id ?? null,
	run: userData?.run ?? userData?.rut ?? userData?.id ?? '',
	nombre: userData?.firstName ?? userData?.name ?? userData?.nombre ?? '',
	apellidos: userData?.lastName ?? userData?.apellidos ?? '',
	name: userData?.firstName ?? userData?.name ?? userData?.nombre ?? '',
	apellido: userData?.lastName ?? userData?.apellidos ?? '',
	email: userData?.email ?? '',
	role: userData?.role ?? '',
	telefono: userData?.telefono ?? userData?.phone ?? '',
	direccion: userData?.direccion ?? userData?.address ?? '',
	departamento: userData?.departamento ?? '',
	ciudad: userData?.ciudad ?? '',
	region: userData?.region ?? '',
	codigoPostal: userData?.codigoPostal ?? '',
	indicacionesEntrega: userData?.indicacionesEntrega ?? '',
	__raw: userData,
})

export const setUserSession = (userData) => {
	const normalized = normalizeUser(userData)

	localStorage.setItem(USER_KEYS.loggedIn, 'true')
	localStorage.setItem(USER_KEYS.currentUser, JSON.stringify(normalized))

	if (normalized.email) {
		localStorage.setItem(USER_KEYS.email, normalized.email)
	}

	emitAuthChanged()
}

export const clearUserSession = () => {
	localStorage.setItem(USER_KEYS.loggedIn, 'false')
	localStorage.removeItem(USER_KEYS.currentUser)
	localStorage.removeItem(USER_KEYS.email)
	emitAuthChanged()
}

export const isUserLoggedIn = () => {
	const hasToken = Boolean(localStorage.getItem('token'))
	return localStorage.getItem(USER_KEYS.loggedIn) === 'true' || hasToken
}

export const getCurrentUser = () => {
	if (!isUserLoggedIn()) return null
	return JSON.parse(localStorage.getItem(USER_KEYS.currentUser) || 'null')
}

export const getUserRole = () => {
	const user = getCurrentUser()
	if (!user) return null

	if (typeof user.role === 'object' && user.role !== null) {
		return user.role.name || user.role.id || null
	}

	return user.role || null
}

export const isUserAdmin = () => {
	const role = getUserRole()
	return role === 'administrador' || role === 'admin'
}

export const isUserVendedor = () => {
	const role = getUserRole()
	return role === 'vendedor'
}

export const authChangedEventName = AUTH_CHANGED_EVENT
