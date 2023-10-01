<script setup lang="ts">
import spacetime from 'spacetime';
import { QTableProps } from 'quasar';

import { FlightEntry } from 'app/types/LogbookTypes.js';

const props = defineProps<{
	rows: FlightEntry[];
}>();

const columns = [
	{
		name: 'Date',
		label: 'Date',
		field: 'Date',
		align: 'center',
		sortable: true,
		format: (val: string) => spacetime(val).format('numeric-us'),
	},

	{
		name: 'From',
		label: 'From',
		field: 'From',
		align: 'center',
	},
	{ name: 'To', label: 'To', field: 'To', align: 'center', sortable: true },
	{
		name: 'TimeOut',
		label: 'Out',
		field: 'TimeOut',
		align: 'center',

		format: (val: string) =>
			spacetime(val).format('{hour-24-pad}:{minute-pad}'),
	},
	{
		name: 'TimeIn',
		label: 'In',
		field: 'TimeIn',
		align: 'center',

		format: (val: string) =>
			spacetime(val).format('{hour-24-pad}:{minute-pad}'),
	},
	{
		name: 'TotalTime',
		label: 'Total',
		field: 'TotalTime',
		align: 'center',
	},
	{
		name: 'Distance',
		label: 'Distance',
		field: 'Distance',
		align: 'center',
	},
	{
		name: 'Route',
		label: 'Route',
		field: 'Route',
		align: 'center',

		format: (val: string) => val.slice(0, 20) + '...',
	},
	{
		name: 'DayTakeoffs',
		label: 'Day T/O',
		field: 'DayTakeoffs',
		align: 'center',
	},
	{
		name: 'DayLandingsFullStop',
		label: 'Day Ldg',
		field: 'DayLandingsFullStop',
		align: 'center',
	},
	{
		name: 'NightTakeoffs',
		label: 'Nite T/O',
		field: 'NightTakeoffs',
		align: 'center',
	},
	{
		name: 'NightLandingsFullStop',
		label: 'Nite Ldg',
		field: 'NightLandingsFullStop',
		align: 'center',
	},
];
const myPagination = {
	sortBy: 'Date',
	descending: true,
	page: 1,
	rowsPerPage: 10,
};
</script>
<template>
	<div>
		<div v-if="props.rows" class="q-mx-auto">
			<q-table
				class="text-grey-5 previewContainer box-shadow"
				:rows="(rows as QTableProps['rows'])"
				:columns="(columns as QTableProps['columns'])"
				row-key="_id"
				separator="cell"
				binary-state-sort
				table-class="table-class"
				dense
				key="_id"
				dark
				:pagination="myPagination"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
