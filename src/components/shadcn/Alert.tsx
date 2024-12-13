import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const alertVariants = cva(
	"relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
	{
		variants: {
			variant: {
				default: "bg-background text-foreground",
				destructive: "border-red-900/50 text-red-900 dark:border-red-900 [&>svg]:text-red-900"
			}
		},
		defaultVariants: {
			variant: "default"
		}
	}
);

const Alert = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
	<div ref={ref} role='alert' className={clsx(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
	({ className, ...props }, ref) => (
		<h5 ref={ref} className={clsx("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
	)
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
	({ className, ...props }, ref) => (
		<div ref={ref} className={clsx("text-sm [&_p]:leading-relaxed", className)} {...props} />
	)
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
