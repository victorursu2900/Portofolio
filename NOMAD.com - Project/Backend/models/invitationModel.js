const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invitationSchema = new Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    listingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'denied'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const InvitationModel = mongoose.model('InvitationModel', invitationSchema);

module.exports = InvitationModel;
