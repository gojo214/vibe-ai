import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface Props {
    children: React.ReactNode;
    text: string;
    side?: "top" | "bottom" | "left" | "right";
    alignment?: "start" | "center" | "end";
}

export const Hint = ({ children, text, side = "top", alignment = "center" }: Props) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={alignment}>
                    <p>{text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}