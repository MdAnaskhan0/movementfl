const db = require('../config/db');

exports.login = (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM admin WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ status: 'error', message: 'Error logging in' });
    }

    if (result.length > 0) {
      res.send({
        status: 'ok',
        message: 'Login successful',
        adminID: result[0].adminID,
        username: result[0].username,
      });
    } else {
      res.status(401).send({ status: 'error', message: 'Invalid credentials' });
    }
  });
};

// Change password
exports.changePassword = (req, res) => {
  const { adminID, oldPassword, newPassword, confirmNewPassword } = req.body;

  if (!adminID || !oldPassword || !newPassword || !confirmNewPassword) {
    return res.status(400).send({ status: 'error', message: 'All fields are required' });
  }

  if (newPassword !== confirmNewPassword) {
    return res.status(400).send({ status: 'error', message: 'New passwords do not match' });
  }

  // Check if old password matches
  const checkSql = 'SELECT * FROM admin WHERE adminID = ? AND password = ?';
  db.query(checkSql, [adminID, oldPassword], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ status: 'error', message: 'Server error' });
    }

    if (result.length === 0) {
      return res.status(401).send({ status: 'error', message: 'Old password is incorrect' });
    }

    // Update password
    const updateSql = 'UPDATE admin SET password = ? WHERE adminID = ?';
    db.query(updateSql, [newPassword, adminID], (err2, result2) => {
      if (err2) {
        console.error(err2);
        return res.status(500).send({ status: 'error', message: 'Error updating password' });
      }

      res.send({ status: 'ok', message: 'Password changed successfully' });
    });
  });
};
