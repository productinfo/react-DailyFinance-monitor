var React = require('react');

require('../css/main.css');

var TableRow = React.createClass({
  render: function () {
    return (
      <tbody>
        {
          this.props.data.map(function (item) {
            return (<tr className="active"><td>{item.name}</td><td>{item.email}</td><td><span className="glyphicon glyphicon-ok text-success"></span></td></tr>)
          })
        }
      </tbody>
    );
  }
});

module.exports = TableRow;