import { User } from '@supabase/supabase-js';

export interface PlatformConfig {
	name: string;
	aircraftHeaders: string[];
	flightHeaders: string[];
	transformToCsv: (
		flightEntries: FlightEntry[],
		user: LogbookUser
	) => string[];
}

export interface LogbookUser {
	[index: number]: number | string | undefined | symbol;
	companyName?: string;
	displayName?: string;
	uid: string;
	email: string;
	photoURL?: string;
	userData?: {
		displayName: string;
		nickname: string;
		email: string;
		phoneNumber: string;
		photoURL: string;
		providerId: string;
		uid: string;
		sub: string;
		email_verified: boolean;
	};
	aircraft?: Aircraft;
	subscribed: boolean;
	subscription_id?: string;
	customer_id?: string;
	invoice_id?: string;
	checkout_session_id?: string;
	auth?: User;
	user_metadata?: { subcribed: boolean };
	logbookEntries?: FlightEntry[];
	originalFilenames?: string[];
}

export interface FlightEntry {
	_id: string;
	Distance: number;
	AircraftID: string;
	Date: string;
	TimeOut: string;
	TimeIn: string;
	From: string;
	To: string;
	Route: string;
	TotalTime: number;
	DayTakeoffs: number;
	DayLandingsFullStop: number;
	NightTakeoffs: number;
	NightLandingsFullStop: number;
	PIC?: number;
	Solo?: number;
	CrossCountry?: number;

	positionData: Position[];
	originalFilename: string;
}

export interface Aircraft {
	AircraftId: string;
	EquipmentType: string;
	TypeCode: string;
	Make: string;
	Model: string;
	Category: string;
	Class: string;
	GearType: string;
	EngineType: string;
	Complex: boolean;
	TAA: boolean;
	HighPerformance: boolean;
	Pressurized: boolean;
}

export interface Position {
	positionName: string;
	positionInfo: LB_PositionInfo;
}

export interface LB_PositionInfo {
	lcltime: string;
	lcldate: string;
	utcofst: object;
	latitude: number;
	longitude: number;
	ias: number;
	e1ng?: number;
	atvwpt: string;
	wptdst: number;
	altind: number;
	altmsl: number;
	tas: number;
	vspd: number;
}
export interface PapaReturn {
	data: PapaReturnData;
	errors: object;
	meta: object;
}

export interface ParseFileCallback {
	(flightData: PapaReturnData[]): void;
}

export interface PapaReturnData {
	[index: string]: string;
}

export interface AptObj {
	[index: string]: string | number;
	date: string;
	apt: string;
	tz: string;
	nTime: string;
}
