const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const teacherSchema = new mongoose.Schema({
  id: { type: String, },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  imageUrl: { type: String },
  phoneNumber: { type: String, default: '' },
  address: { type: String, default: '' },
  subject: { type: String },
  description: { type: String },
  created_at: { type: Date, default: Date.now }
}, { collection: 'Teachers' });

// Hash the password before saving to the database
teacherSchema.pre('save', function (next) {
  const teacher = this;
  if (!teacher.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(teacher.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      teacher.password = hash;
      next();
    });
  });
});

// Compare the password entered by the user with the hashed password in the database
teacherSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;