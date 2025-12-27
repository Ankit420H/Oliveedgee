import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2 }) => {
    const activeStyle = "font-sans text-xs font-bold uppercase tracking-widest text-clinical-ink";
    const inactiveStyle = "font-sans text-xs uppercase tracking-widest text-clinical-ink/40 cursor-default";

    return (
        <nav className="flex justify-center mb-16">
            <div className="flex items-center gap-4">
                {step1 ? (
                    <Link to="/login" className={activeStyle}>Identity</Link>
                ) : (
                    <span className={inactiveStyle}>Identity</span>
                )}

                <span className="text-xs text-clinical-ink/60">/</span>

                {step2 ? (
                    <span className={activeStyle}>Checkout</span>
                ) : (
                    <span className={inactiveStyle}>Checkout</span>
                )}




            </div>
        </nav>
    );
};

export default CheckoutSteps;
