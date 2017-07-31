/**
  Makes the currently selected group available as a service.

  Uses `angular.copy()` so you can bind the value to your
  controller and it will keep updated. e.g.:

    `this.activeGroup = CurrentGroup.value`

*/
export default class CurrentGroup {

  constructor(User, SessionUser) {
    "ngInject";
    Object.assign(this, {
      value: {},
      User,
      SessionUser,
      map: {
        overview: true,
        center: {
          lat: 0.0,
          lng: 0.0,
          zoom: 15
        },
        options: {
          showStores: true,
          showUsers: false
        }
      }
    });
  }

  set(value) {
    angular.copy(value, this.value);
    this.persistCurrentGroup(value.id);
  }

  clear() {
    angular.copy({}, this.value);
    this.persistCurrentGroup(null);
  }

  persistCurrentGroup(groupId) {
    this.SessionUser.loaded.then((user) => {
      this.User.save({
        id: user.id,
        current_group: groupId  //eslint-disable-line
      });
    });
  }

}
