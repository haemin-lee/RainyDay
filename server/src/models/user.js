import mongoose from 'mongoose'

// received through:
// https://developer.fusionfabric.cloud/api/corporate-profile-v1-1ec64da1-0324-48ba-bdf6-7f4678926db8/docs#operation/getUserDetails
const schema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        finastra_id: {
            type: String,
            index: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('User', schema)
