
var TableRow = require('./TableRow');
var React = require('react');

require('./css/main.css');

var MainTable = React.createClass({
  
  // Invoked once, on both client & server before rendering occurs
  componentWillMount: function () {
    var self = this;
    $.ajax({
      method: 'GET',
      url: '/api'
    })
    .done(function (data) {
      self.setState({
        data: data
      });
    })
    .fail(function (err) {
      console.log(err);
    });
  },

  getInitialState: function () {
    return {
      data: []
    };
  },

  render: function () {
    return (
      <table className="table table-bordered table-condensed">
        <thead>
          <tr className="success">
            <th>Name</th>
            <th>Email</th>
            <th>Registered</th>
          </tr>
        </thead>
        <TableRow data={this.state.data} />
      </table>
    );
  }
});

module.exports = MainTable;