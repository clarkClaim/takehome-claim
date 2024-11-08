import { PayoutProcessor } from './processor'
import * as types from './types';
import * as redemption from './redemption';

const processor = {
    processUpdatedPayout: PayoutProcessor.processUpdatedPayout
}; 

export { processor, types, redemption };


