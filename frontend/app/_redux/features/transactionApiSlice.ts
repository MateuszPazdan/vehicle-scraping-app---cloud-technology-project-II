import { apiSlice } from '../services/apiSlice';

export interface Transaction {
	id: number;
	weight: number;
	transactionDate: string;
	totalPrice: number;
	storageLocation: {
		id: number;
		locationNr: string;
	};
	wasteType: {
		id: number;
		name: string;
	};
}

export interface TransactionBody {
	weight: number;
	storageLocationId: number;
	totalPrice: number;
}

const transactionApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createTransaction: builder.mutation<Transaction, TransactionBody>({
			query: (transaction) => ({
				url: '/transactions',
				method: 'POST',
				body: {
					weight: Number(transaction.weight),
					storageLocationId: transaction.storageLocationId,
					totalPrice: Number(transaction.totalPrice),
				},
			}),
		}),
		retrieveTransactions: builder.query<Transaction[], void>({
			query: () => ({
				url: '/transactions',
				method: 'GET',
			}),
		}),
	}),
});

export const { useCreateTransactionMutation, useRetrieveTransactionsQuery } =
	transactionApiSlice;
