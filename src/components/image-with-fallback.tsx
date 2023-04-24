import Image, { type ImageProps } from "next/image"
import { type SyntheticEvent, useEffect, useState } from "react"

export function ImageWithFallback({
	fallback,
	alt,
	src,
	...props
}: {
	fallback: string
} & ImageProps) {
	const [error, setError] = useState<SyntheticEvent<HTMLImageElement, Event> | null>(null)

	useEffect(() => {
		setError(null)
	}, [src])

	return <Image alt={alt} onError={setError} src={error ? fallback : src} {...props} />
}
