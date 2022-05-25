const db = require('../models');

const Assign = db.assEmployee;

exports.addAssignEmployees = async (req, res) => {
  try {
    const { checkedEmployeeId, orderId } = req.body;
    // eslint-disable-next-line array-callback-return
    checkedEmployeeId.map((employeeId) => {
      Assign.create({
        orderId,
        employeeId,
      });
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

exports.getAssignEmployees = (req, res) => {
  const { orderId } = req.query;
  Assign.findAll({ where: { orderId } })
    .then((assignEmployeeInfos) => {
      const assignEmployees = [];
      // eslint-disable-next-line array-callback-return
      assignEmployeeInfos.map((assignEmployeeInfo) => {
        const { orderId, employeeId } = assignEmployeeInfo;
        const assignEmployee = {
          orderId,
          employeeId,
        };
        assignEmployees.push(assignEmployee);
      });
      res.status(200).send({ assignEmployees });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

// exports.editBus = (req, res) => {
//   const { busNumber, busPlates, busGasCode, busId } = req.body;
//   Bus.update(
//     {
//       busNumber,
//       busPlates,
//       busGasCode,
//     },
//     { where: { id: busId } }
//   )
//     .then(() => {
//       res.status(200).send({ message: 'Update is success' });
//     })
//     .catch((err) => res.status(500).send({ message: err }));
// };

// exports.delBus = (req, res) => {
//   const { busId } = req.body;
//   Bus.destroy({
//     where: {
//       id: busId,
//     },
//   })
//     .then(() => {
//       res.status(200).send({ message: 'Bus Deleted!' });
//     })
//     .catch((err) => {
//       res.status(500).send({ message: err });
//     });
// };
