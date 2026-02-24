import {
	isPermissionGranted,
	requestPermission,
	sendNotification,
} from '@tauri-apps/plugin-notification'

interface SystemNotificationOptions {
	title: string
	body?: string
}

export async function sendSystemNotification(
	options: SystemNotificationOptions
): Promise<boolean> {
	if (!IS_TAURI) {
		return false
	}

	try {
		let granted = await isPermissionGranted()
		if (!granted) {
			const permission = await requestPermission()
			granted = permission === 'granted'
		}

		if (!granted) {
			return false
		}

		sendNotification(options)
		return true
	} catch (error) {
		console.error('Failed to send system notification:', error)
		return false
	}
}
