import { apiSlice } from '../services/apiSlice';
import { Owner } from './ownerApiSlice';

export type VehicleStatus = 'RECEIVED_FOR_DISMANTLING' | 'DISMANTLED';

export interface VehicleFilters {
	brand?: string;
	model?: string;
	year_of_production?: number;
	vin?: string;
	registration_number?: string;
	vehicle_status?: VehicleStatus | string;
	owner_pesel?: string;
}

export interface Vehicle {
	id: number;
	brand: string;
	model: string;
	year_of_production: number;
	vin: string;
	registration_number: string;
	registration_certificate_number: string;
	weight: number;
	status: VehicleStatus;
	receivedAt: string;
	dismantledAt: string | null;
	price: number;
}

export interface VehicleDetails extends Vehicle {
	owners: Owner[];
}

export interface VehicleBody {
	brand: string;
	model: string;
	year_of_production: number;
	vin: string;
	registration_number: string;
	registration_certificate_number: string;
	weight: number;
	price: number;
	owners: string[];
}

const vehiclesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createVehicle: builder.mutation<Vehicle, VehicleBody>({
			query: (vehicle) => ({
				url: '/vehicles',
				method: 'POST',
				body: {
					...vehicle,
					year_of_production: Number(vehicle.year_of_production),
					weight: Number(vehicle.weight),
					price: Number(vehicle.price),
				},
			}),
		}),
		retrieveVehicles: builder.query<Vehicle[], VehicleFilters>({
			query: (filters) => ({
				url: '/vehicles',
				method: 'GET',
				params: filters,
			}),
		}),
		retrieveVehicle: builder.query<VehicleDetails, number>({
			query: (id) => ({
				url: `/vehicles/details/${id}`,
				method: 'GET',
			}),
		}),
		retrieveFiltersInfo: builder.query<
			{ brands: string[]; models: string[] },
			{ brand?: string }
		>({
			query: (params) => ({
				url: `vehicles/filter_input?brand=${params?.brand}`,
				method: 'GET',
			}),
		}),
		dismantleVehicle: builder.mutation<Vehicle, number>({
			query: (id) => ({
				url: `/vehicles/status/${id}`,
				method: 'PATCH',
			}),
		}),
	}),
});

export const {
	useCreateVehicleMutation,
	useRetrieveVehiclesQuery,
	useRetrieveVehicleQuery,
	useRetrieveFiltersInfoQuery,
	useDismantleVehicleMutation,
} = vehiclesApiSlice;
