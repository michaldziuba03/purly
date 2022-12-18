import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator(
    (field: string | undefined, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        const user = req.session.get('user');

        if (!user) {
            return;
        }

        return field ? user[field] : user; 
    }
)