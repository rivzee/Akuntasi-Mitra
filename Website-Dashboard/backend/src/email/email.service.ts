import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;

    constructor() {
        // Konfigurasi SMTP Gmail
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Email pengirim (dari .env)
                pass: process.env.EMAIL_PASS, // App Password Gmail (dari .env)
            },
        });
    }

    // Kirim email selamat datang setelah registrasi
    async sendWelcomeEmail(to: string, fullName: string) {
        const mailOptions = {
            from: `"RISA BUR - Kantor Jasa Akuntan" <${process.env.EMAIL_USER}>`,
            to: to,
            subject: '🎉 Selamat Datang di RISA BUR!',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .button {
              display: inline-block;
              padding: 12px 30px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              color: #666;
              font-size: 12px;
            }
            .feature {
              background: white;
              padding: 15px;
              margin: 10px 0;
              border-left: 4px solid #667eea;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🎉 Selamat Datang!</h1>
            <p>Terima kasih telah bergabung dengan RISA BUR</p>
          </div>
          
          <div class="content">
            <h2>Halo, ${fullName}! 👋</h2>
            
            <p>Selamat! Akun Anda telah berhasil dibuat. Kami sangat senang Anda bergabung dengan platform akuntansi modern kami.</p>
            
            <h3>✨ Apa yang bisa Anda lakukan sekarang?</h3>
            
            <div class="feature">
              <strong>📊 Dashboard Intuitif</strong>
              <p>Akses dashboard yang mudah digunakan untuk mengelola keuangan bisnis Anda.</p>
            </div>
            
            <div class="feature">
              <strong>👨‍💼 Akuntan Profesional</strong>
              <p>Terhubung dengan akuntan bersertifikat untuk kebutuhan akuntansi Anda.</p>
            </div>
            
            <div class="feature">
              <strong>📈 Laporan Real-time</strong>
              <p>Dapatkan laporan keuangan yang akurat dan up-to-date kapan saja.</p>
            </div>
            
            <div class="feature">
              <strong>🔒 Keamanan Terjamin</strong>
              <p>Data Anda dilindungi dengan enkripsi tingkat enterprise.</p>
            </div>
            
            <center>
              <a href="http://localhost:3000/login" class="button">
                🚀 Masuk ke Dashboard
              </a>
            </center>
            
            <p style="margin-top: 30px;">
              <strong>Email Anda:</strong> ${to}<br>
              <strong>Status Akun:</strong> Aktif ✅
            </p>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi tim support kami.
            </p>
          </div>
          
          <div class="footer">
            <p>© 2024 RISA BUR - Kantor Jasa Akuntan Profesional</p>
            <p>Email ini dikirim otomatis, mohon tidak membalas.</p>
          </div>
        </body>
        </html>
      `,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log('✅ Email terkirim:', info.messageId);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error('❌ Gagal mengirim email:', error);
            return { success: false, error: error.message };
        }
    }

    // Kirim email notifikasi order baru (opsional untuk nanti)
    async sendOrderNotification(to: string, orderDetails: any) {
        const mailOptions = {
            from: `"RISA BUR" <${process.env.EMAIL_USER}>`,
            to: to,
            subject: '📦 Order Baru Diterima',
            html: `
        <h2>Order Baru</h2>
        <p>Order ID: ${orderDetails.id}</p>
        <p>Status: ${orderDetails.status}</p>
        <p>Total: Rp ${orderDetails.totalAmount}</p>
      `,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('✅ Email order terkirim');
        } catch (error) {
            console.error('❌ Gagal mengirim email order:', error);
        }
    }
}
