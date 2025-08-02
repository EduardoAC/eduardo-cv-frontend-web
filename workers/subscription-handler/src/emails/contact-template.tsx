interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export function ContactEmail({ name, email, message }: ContactEmailProps) {
  return (
    <div>
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Message:</strong></p>
      <p>{message.replace(/\n/g, '<br>')}</p>
      <hr />
      <p><small>Sent from your website contact form</small></p>
    </div>
  );
} 