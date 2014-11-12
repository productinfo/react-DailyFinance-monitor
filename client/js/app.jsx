var data = [
  {
    "name": "Ko-wei Ma",
    "email": "kwma313@hotmail.com"
  },
  {
    "name": "Lucas",
    "email": "icrtiou@gmail.com"
  },
  {
    "name": "Will Ding",
    "email": "fly_windchild@hotmail.com"
  },
  {
    "name": "tg",
    "email": "dgjdqqj+t0bil0@sharklasers.com"
  },
  {
    "name": "tg",
    "email": "dgjdqqj+t0bil0@sharklasers.com"
  },
  {
    "name": "Leo",
    "email": "leo0924@gmail.com"
  },
  {
    "name": "Roshan",
    "email": "icemission@gmail.com"
  }
];

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

React.render(
  <MainTable />,
  document.querySelector('#entry')
);