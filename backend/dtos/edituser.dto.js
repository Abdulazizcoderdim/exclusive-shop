module.exports = class EditUserDto {
  id;
  name;
  lastName;
  email;
  isActivated;
  role;

  constructor(model) {
    this.id = model._id;
    this.name = model.name;
    this.lastName = model.lastName;
    this.email = model.email;
    this.role = model.role;
    this.isActivated = model.isActivated;
  }
};
