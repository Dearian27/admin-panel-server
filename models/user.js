import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  status: {
    type: String,
    // enum: 'viewer' | 'admin',
    default: 'viewer'
  },
},
  {
    timestamps: true
  },
)
export default mongoose.model('User', UserSchema);