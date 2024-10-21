import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { UserDocument } from './models/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository extends AbstractRepository<UserDocument> {
  protected readonly logger = new Logger(UsersRepository.name);
  constructor(@InjectModel(UserDocument.name) userModel: Model<UserDocument>) {
    super(userModel);
  }
}

//When UsersRepository is instantiated, NestJS injects the Mongoose model for UserDocument into the userModel parameter in abstract repository.

//@injectModel: This is a NestJS-specific feature that allows you to inject dependencies into your services. like UserModel to the constructor of AbstractRepository to specify it's userModel.

//The super(userModel) call:
//The constructor of AbstractRepository is executed, passing the userModel to it.
//This sets the model property in the AbstractRepository to the Mongoose userModel, allowing the repository methods to interact with the MongoDB collection for UserDocument.

//service (model) it gets the model to give it to the repository constructor, with @InjectModel it injects the (model) inside the constructor, the super method in the constructor invokes the constructor (allow to pass the model) which is inherits the abstract repository