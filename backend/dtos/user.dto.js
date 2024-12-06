module.exports = class UserDto {
  id;
  name;
  email;
  phoneNumber;
  isActivated;
  role;

  constructor(model) {
    this.id = model._id;
    this.name = model.name;
    this.email = model.email;
    this.phoneNumber = model.phoneNumber;
    this.role = model.role;
    this.isActivated = model.isActivated;
  }
};
