import { Input, TextInput } from "@mantine/core";
import styles from "./MapPicker.module.css";
import type { LatLngExpression, Map, MapOptions, Marker } from "leaflet";
import {
	useEffect,
	useMemo,
	useRef,
	useState,
	type ComponentProps,
	type FC,
} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export type MapPickerState = ComponentProps<typeof Input.Wrapper> & {
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
};

const MapPicker: FC<MapPickerState> = (props) => {
	const { className = "", value, defaultValue, onChange, ...rest } = props;

	const mapRef = useRef<HTMLDivElement | null>(null);
	const mapInstance = useRef<Map | null>(null);
	const markerRef = useRef<Marker | null>(null);

	const [position, setPosition] = useState<[number, number]>();

	const inputValue = useMemo(() => position?.join(" ") ?? "", [position]);

	useEffect(() => {
		if (!mapRef.current) return;

		mapInstance.current?.remove();

		const options: MapOptions = {
			center: [21.026607819503038, 105.85052490234376],
			zoom: 13,
			zoomControl: true,
			scrollWheelZoom: false,
			attributionControl: true,
		};

		const map = L.map(mapRef.current, options);

		mapInstance.current = map;

		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution: '&copy; <a href="https://www.openstreetmap.org/">OSM</a>',
		}).addTo(map);

		// ==============================
		// 🧭 Ctrl + Scroll để zoom
		// ==============================
		let ctrlPressed = false;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey && !ctrlPressed) {
				ctrlPressed = true;
				map.scrollWheelZoom.enable();
				map.getContainer().classList.add("ctrl-zoom-active");
			}
		};

		const handleKeyUp = () => {
			if (ctrlPressed) {
				ctrlPressed = false;
				map.scrollWheelZoom.disable();
				map.getContainer().classList.remove("ctrl-zoom-active");
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		// ==============================
		// 📍 Click để chọn vị trí
		// ==============================
		map.on("click", (e: L.LeafletMouseEvent) => {
			const latlng: [number, number] = [e.latlng.lat, e.latlng.lng];

			setPosition(latlng);
			if (onChange) {
				onChange(latlng.join(" "));
			}

			// Cập nhật marker
			if (markerRef.current) markerRef.current.setLatLng(latlng);
			else markerRef.current = L.marker(latlng).addTo(map);
			map.setView(latlng);
		});

		// Cleanup
		return () => {
			map.remove();
			mapInstance.current = null;
			markerRef.current = null;

			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, []);

	useEffect(() => {
		const activeValue = value ?? defaultValue;

		if (!activeValue || !mapInstance.current) return;

		const pos: [number, number] | null = activeValue.split(" ").map(Number) as [
			number,
			number,
		];

		if (pos && pos != position) {
			if (markerRef.current) markerRef.current.setLatLng(pos);
			else markerRef.current = L.marker(pos).addTo(mapInstance.current);

			mapInstance.current.setView(pos);
			setPosition(pos);
		}
	}, [value, defaultValue]);

	return (
		<Input.Wrapper {...rest} className={`${className}`}>
			<Input value={inputValue} readOnly />

			<div ref={mapRef} className={styles.mapContainer} />
		</Input.Wrapper>
	);
};

export default MapPicker;
