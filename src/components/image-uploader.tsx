import Uppy from "@uppy/core"
import { Dashboard } from "@uppy/react"
import Transloadit, { type Assembly } from "@uppy/transloadit"
import ImageEditor from "@uppy/image-editor"

// Don't forget the CSS: core and the UI components + plugins you are using.
import "@uppy/core/dist/style.min.css"
import "@uppy/dashboard/dist/style.min.css"
import "@uppy/image-editor/dist/style.min.css"

import { env } from "@/env.mjs"
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react"
import { useEffect, useMemo } from "react"

const TRANSLOADIT_TEMPLATE_ID = "492e5bef48c949a798200fab3e8ec3f1"

interface ImageUploaderProps {
	onComplete?: (assembly: Assembly) => void
	opened?: boolean
	close: () => void
}

export default function ImageUploader({ onComplete, opened = false, close }: ImageUploaderProps) {
	const uppy = useMemo(() => {
		const uppyInstance = new Uppy({
			restrictions: {
				maxFileSize: 1024 * 1024,
				maxNumberOfFiles: 1,
				minNumberOfFiles: 1,
				allowedFileTypes: ["image/*"],
			},
		})
			.use(ImageEditor, {
				cropperOptions: {
					viewMode: 1,
					background: false,
					autoCropArea: 1,
					responsive: true,
					croppedCanvasOptions: {},
					aspectRatio: 1,
				},
				actions: {
					revert: true,
					rotate: false,
					granularRotate: false,
					flip: true,
					zoomIn: true,
					zoomOut: true,
					cropSquare: true,
					cropWidescreen: false,
					cropWidescreenVertical: false,
				},
			})
			.use(ImageEditor, { id: "MyImageEditor" })
			.use(Transloadit, {
				waitForEncoding: true,
				assemblyOptions: {
					params: {
						auth: { key: env.NEXT_PUBLIC_TRANSLOADIT_AUTH_KEY },
						template_id: TRANSLOADIT_TEMPLATE_ID,
					},
				},
			})

		uppyInstance.on("transloadit:complete", (assembly) => {
			onComplete?.(assembly)
		})

		uppyInstance.on("complete", () => {
			close?.()
		})

		return uppyInstance
	}, [close, onComplete])

	return (
		<Modal isOpen={opened} onClose={close}>
			<ModalOverlay />
			<ModalContent>
				<Dashboard uppy={uppy} note={"Image only, 1mb or less"} plugins={["ImageEditor"]} />
			</ModalContent>
		</Modal>
	)
}
