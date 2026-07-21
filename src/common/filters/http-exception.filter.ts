import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {


    catch(
        exception: any,
        host: ArgumentsHost,
    ) {


        const response =
            host.switchToHttp()
                .getResponse();



        response.status(500)
            .json({

                success: false,

                message:
                    exception.message,

                timestamp:
                    new Date(),

            });


    }


}