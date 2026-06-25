import { apiSlice } from '../../app/api/apiSlice';


export const quizApiSlice = apiSlice.injectEndpoints({

    endpoints: builder => ({

        // Random puzzle call query
        getRandom: builder.query({
            query: () => '/questions/random'
        })
    })
});



export const { useGetRandomQuery } = quizApiSlice;