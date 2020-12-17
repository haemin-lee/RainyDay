import mongoose from 'mongoose'

// store csv file for future reference
const schema = mongoose.Schema(
    {
        data: [String],
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Sheet', schema)
