# Placeholder for email sending logic
import aiosmtplib
from email.message import EmailMessage
from app.core.config import settings

async def send_email(subject: str, body: str, to: str = None):
    msg = EmailMessage()
    msg["From"] = settings.EMAIL_FROM
    msg["To"] = to or settings.EMAIL_TO
    msg["Subject"] = subject
    msg.set_content(body)
    await aiosmtplib.send(
        msg,
        hostname=settings.SMTP_SERVER,
        port=settings.SMTP_PORT,
        username=settings.SMTP_USERNAME,
        password=settings.SMTP_PASSWORD,
        start_tls=True,
    )
