import db from "../dataBase/DbConnection.mjs"; //Import the connection to the database
import crypto from "crypto";
import nodemailer from 'nodemailer';
import bcrypt from "bcrypt"; //Import bcrypt for password management

// Controller for requesting password reset
export const RequestResetController = (req, res) => {
  const { email } = req.body;
  // Verificar si el usuario existe
  db.query("SELECT id FROM users WHERE email = ?", [email], async (err, userResults) => {
    if (err) {
      return res.status(500).json({ message: "Error al verificar el usuario", error: err });
    }

    if (userResults.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Generar un código único y su expiración
    const resetCode = crypto.randomBytes(3).toString("hex");
    const expiration = Date.now() + 3600000; // 1 hora

    // Guardar el código en la base de datos
    db.query(
      "UPDATE users SET resetCode = ?, codeExpiration = ? WHERE email = ?",
      [resetCode, expiration, email],
      async (err) => {
        if (err) {
          return res.status(500).json({ message: "Error al guardar el código de restablecimiento", error: err });
        }

        // Enviar email con el código de restablecimiento
        const sendResetEmail = async (email, code) => {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: 'julianjimenez2128@gmail.com',
              pass: 'nivu qqds gvxa oaca',
            },
          });

          const mailOptions = {
            from: 'tu_correo@gmail.com',
            to: email,
            subject: 'Restablecimiento de Contraseña',
            text: `Tu código de restablecimiento es: ${code}`,
          };

          await transporter.sendMail(mailOptions);
        };

         sendResetEmail(email, resetCode);
        res.json({ message: "Código de restablecimiento enviado al correo." });
      }
    );
  });
};


// Controller for verifying reset code
export const verifyCodeController = (req, res) => {
  const { email, code } = req.body;

  db.query("SELECT codeExpiration, resetCode FROM users WHERE email = ?", [email], (err, userResults) => {
    if (err) {
      return res.status(500).json({ message: 'Error al verificar el usuario', error: err });
    }

    if (!userResults.length || Date.now() > userResults[0].codeExpiration || userResults[0].resetCode !== code) {
      return res.status(400).json({ message: 'Código inválido o expirado' });
    }

    res.json({ message: 'Código verificado correctamente' });
  });
};


// Controller for changing the password
export const changePasswordController = (req, res) => {
  const { email, newPassword } = req.body;

  // Hash de la nueva contraseña
  bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error al cambiar la contraseña', error: err });
    }

    db.query("UPDATE users SET codeExpiration = NULL, resetCode = NULL, password = ? WHERE email = ?",
      [hashedPassword, email],
      (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error al actualizar la contraseña', error: err });
        }

        res.json({ message: 'Contraseña actualizada correctamente' });
      }
    );
  });
};


export default RequestResetController;
