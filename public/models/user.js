/**
 * Schema for a user
 */
module.exports = function (Data) {
    // Private data members
    this.username = Data.email;
    this.password = Data.password;
    this.email = Data.email;
    this.name = Data.name;
    this.mobile = Data.mobile;
    this.category = Data.category;
    this.Stu_Id_ = Data.Stu_Id_;
};