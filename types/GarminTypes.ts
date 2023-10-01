export interface GarminFlightParams {
	[index: string]: string | number | undefined;
	lcltime: string;
	lcldate: string;
	utcofst: string;
	latitude: number;
	longitude: number;
	ias: number;
	e1ng?: number;
	atvwpt: string;
	wptdst: number;
	altind?: number;
	altmsl?: number;
	gndspd?: number;
	tas?: number;
	vspd?: number;
}
