/**
 * Created by vic on 12/31/13.
 */


module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Entry', {
        content : DataTypes.TEXT,
        likes : DataTypes.INTEGER,
        accepted : DataTypes.BOOLEAN
    }, {
        instanceMethods: {
            voteUp : function() {
                this.likes++;
                this.save();
                return this.likes;
            },
            voteDown : function() {
                this.likes--;
                this.save();
                return this.likes;
            }
        }
    });
};


