import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cn } from "@my-better-t-app/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-none border border-transparent bg-clip-padding text-xs font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-danger aria-invalid:ring-1 aria-invalid:ring-danger/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-background shadow-[0_0_40px_color-mix(in_oklab,var(--primary)_20%,transparent)] hover:bg-primary/90",
        outline:
          "border-border bg-surface/80 text-text-primary hover:border-primary/30 hover:bg-surface hover:text-text-primary aria-expanded:bg-surface aria-expanded:text-text-primary",
        secondary:
          "border border-accent/25 bg-accent/12 text-accent hover:bg-accent/18 aria-expanded:bg-accent/16 aria-expanded:text-accent",
        ghost:
          "text-text-secondary hover:bg-surface hover:text-text-primary aria-expanded:bg-surface aria-expanded:text-text-primary",
        destructive:
          "border border-danger/25 bg-danger/12 text-danger hover:bg-danger/20 focus-visible:border-danger/40 focus-visible:ring-danger/20",
        link: "text-primary underline-offset-4 hover:text-primary-glow hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-none px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-none px-2.5 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-8",
        "icon-xs": "size-6 rounded-none [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 rounded-none",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
