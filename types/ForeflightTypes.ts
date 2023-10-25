export interface Foreflight_Flight_Entry {
	Date: string;
	AircraftID: string;
	From: string;
	To: string;
	Route?: string;
	TimeOut: string;
	TimeOff?: string;
	TimeOn?: string;
	TimeIn: string;
	OnDuty?: string;
	OffDuty?: string;
	TotalTime: number;
	PIC?: number;
	SIC?: number;
	Night?: number;
	Solo?: number;
	CrossCountry?: number;
	NVG?: number;
	NVGOps?: number;
	Distance: number;
	DayTakeoffs: number;
	DayLandingsFullStop: number;
	NightTakeoffs: number;
	NightLandingsFullStop: number;
	AllLandings?: number;
	ActualInstrument?: number;
	SimulatedInstrument?: number;
	HobbesStart?: number;
	HobbesEnd?: number;
	TachStart?: number;
	TachEnd?: number;
	Holds?: number;
	Approach1?: string;
	Approach2?: string;
	Approach3?: string;
	Approach4?: string;
	Approach5?: string;
	Approach6?: string;
	DualGiven?: number;
	DualReceived?: number;
	SimulatedFlight?: number;
	GroundTraining?: number;
	InstructorName?: string;
	InstructorComments?: string;
	FlightReview?: boolean;
	Checkride?: boolean;
	IPC?: boolean;
	NVGProficiency?: boolean;
}

export interface ForeFlightAircraft {
	AircraftId: string;
	EquipmentType:
		| 'Aircraft'
		| 'Full Flight Simulator (FFS)'
		| 'Flight Training Device (FTD)'
		| 'Basic Aircraft Training Device (BATD)'
		| 'Advanced Aircraft Training Device (AATD)';
	TypeCode: string;
	Make: string;
	Model: string;
	Category: string;
	Class:
		| 'Airplane Single Engine Lane (ASEL)'
		| 'Airplane Multi Engine Land (AMEL)'
		| 'Airplane Single Engine Sea (AMES)'
		| 'Airplace Single Engine Sea (ASES)'
		| 'Rotorcraft Helicopter (RH)'
		| 'Rotorcraft Gyroplane (RG)'
		| 'Glider (GL)'
		| 'Lighter Than Air Airship (LA)'
		| 'Lighter Than Air Balloon (LTB)'
		| 'Powered Lift (PLIFT)'
		| 'Powered Parachute Land (PL)'
		| 'Powered Parachute Sea (PS)'
		| 'Weight Shift Control Land (WL)'
		| 'Weight Shift Control Sea (WS)';

	GearType:
		| 'None'
		| 'Fixed Tailwheel (FC)'
		| 'Fixed Tricycle (FT)'
		| 'Amphibian (AM)'
		| 'Retractable Tailwheel (RC)'
		| 'Fixed Tailwheel (FC)'
		| 'Skids'
		| 'Skis'
		| 'Floats (FL)';
	EngineType:
		| 'Diesel'
		| 'Electric'
		| 'Non-Powered'
		| 'Piston'
		| 'Radial'
		| 'TurboFan'
		| 'TurboShaft'
		| 'Turboprop'
		| 'Turbojet';
	Complex: boolean;
	TAA: boolean;
	HighPerformance: boolean;
	Pressurized: boolean;
}
