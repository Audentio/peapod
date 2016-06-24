/* eslint-disable */

// Structure your validationSchema like this
// It gets merged with default schema so you only need to define what you want changed

schema = {

    // global responses
    // as in applied to all fields regardless of type/name
    // If you simply want to change base responses, this is where you do it
    response: {
        invalid: <Input_ValidationResponse danger icon="error">Bad value</Input_ValidationResponse>,

        valid: <Input_ValidationResponse success icon="check_circle">Atta boy</Input_ValidationResponse>,

        empty: "Let's not leave that empty", // strings will show as base validationResponse
    },


    // target fields by type
    types: {

        // Let's define custom schema for email.
        email: {

            // Custom validation function
            // -- invalidate Mike's email
            validator: value => {
                // your own validation logic.
                // return a response key.
                // You can use custom keys,just remember to set a response for that key globally or locally (below)
                return email.indexOf('mikec') ? 'banned' : 'valid';
            },

            // local responses
            // defining response for valid is not necessary. It'll be inherited from global responses
            // -- you could, however, define it and it'll override the global
            response: {
                banned: <Input_ValidationResponse warning icon="error">Mike must not pass</Input_ValidationResponse>,
            }
        }
    },

    // target fields by name
    // When you really need to get specific
    names: {

        // Let's say... userCredits?
        // We'll make sure no goes get more than 100 credits :)
        userCredits: {

            validator: value => {
                return value > 100 ? 'tooMuch' : 'whocares'
            },

            response: {
                tooMuch: <Input_ValidationResponse danger icon="money_off">He must stay poor!</Input_ValidationResponse>,
                whocares: <Input_ValidationResponse>Eh, who cares</Input_ValidationResponse>
            }

        }

    }

    props: {
        foo: {
            match: 'bar',
        },

        faz: {
            match: name => name !== 'this' && name !=== 'that'
        }
    }
}
