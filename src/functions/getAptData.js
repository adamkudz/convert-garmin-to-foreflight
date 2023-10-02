import spacetime from 'spacetime';
import daylight from 'spacetime-daylight';
spacetime.extend(daylight);
export async function getAptData(flight, index, position) {
	// get data from the current position
	const aptObj = {};
	const xDate = flight[index].lcldate;
	const xTime = flight[index].lcltime;
	const xOffset = flight[index].utcofst;
	const xLat = flight[index].latitude;
	const xLon = flight[index].longitude;

	// get the timezone
	const xTz = getTz(xLon, xLat, xDate, xTime);

	// determine if there is an offset, return the operator and factor for the offset
	const oSet = getOffset(xOffset);

	// apply tz and offset to get the normalized time(nt)
	const ntime = normalizedTime(oSet, xDate, xTime, xTz, xOffset);

	aptObj[position] = {
		date: xDate,
		apt: '',
		tz: xTz,
		nTime: ntime,
		lat: xLat,
		lon: xLon,
	};

	function getTz(_lon, _lat, _date) {
		const s = spacetime(_date);
		const loc = s.in([_lat, _lon]);
		return loc.timezone().name;
	}

	function getOffset(_offset) {
		const _p = _offset.slice(0, 1);
		const _f = parseInt(_offset.slice(2, 3));

		if (_p === '+') {
			return { oSetOp: true, oSetFactor: _f };
		} else {
			return { oSetOp: false, oSetFactor: _f };
		}
	}

	function normalizedTime(_oSet, _date, _time, _tz, _offset) {
		let s = spacetime(_date).time(_time);
		if (_offset === '00:00') {
			return s;
		}
		if (_oSet.oSetOp) {
			s = s.subtract(_oSet.oSetFactor, 'hours');
			return s;
		} else {
			s = s.add(_oSet.oSetFactor, 'hours');
			return s;
		}
	}
	return aptObj;
}

// corrects for garmin offset and returns spacetime object
