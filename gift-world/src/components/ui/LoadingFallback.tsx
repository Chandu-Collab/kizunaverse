import { Suspense } from 'react';
import { Html } from '@react-three/drei';

interface LoadingFallbackProps {
  message?: string;
}

function LoadingFallback({ message = "Loading..." }: LoadingFallbackProps) {
  return (
    <Html center>
      <div style={{
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        minWidth: '200px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 2s linear infinite',
          margin: '0 auto 10px'
        }}></div>
        {message}
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </Html>
  );
}

interface OptimizedSuspenseProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function OptimizedSuspense({ children, fallback }: OptimizedSuspenseProps) {
  return (
    <Suspense fallback={fallback || <LoadingFallback />}>
      {children}
    </Suspense>
  );
}

export default LoadingFallback;