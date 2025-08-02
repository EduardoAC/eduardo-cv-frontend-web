interface SubscriberEmailProps {
  email: string;
  signupTime: string;
}

export function SubscriberEmail({ email, signupTime }: SubscriberEmailProps) {
  return (
    <div>
      <h2>🎉 New Blog Subscriber!</h2>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Signup Time:</strong> {signupTime}</p>
      <hr />
      <p><small>This person subscribed to your blog newsletter</small></p>
    </div>
  );
} 